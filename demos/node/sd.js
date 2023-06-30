import * as SDK from '@input-output-hk/atala-prism-wallet-sdk';
import { SHA256 } from '@stablelib/sha256';
import {HasherAlgorithm, SdJwt } from 'jwt-sd';

import {HMAC} from '@stablelib/hmac'
const { Apollo, Domain, KeyProperties } = SDK;
const { Curve } = Domain;

const linkSecret = Buffer.from("HEllo link secret");
const createSigner = (privateKey) =>  {
    return (input) => {
        if (privateKey.isSignable()) {
            return privateKey.sign(Buffer.from(input))
        }
        throw new Error("Not signable key, can't sign")
    }
}
const parseClaims = (claims = [], to) => {
    return Object.values([...claims])
        .reduce((allClaims, currentClaim) => {
            return {
                ...allClaims,
                ...Object.keys(currentClaim).reduce((allCurrent, key) => {
                    return {
                        ...allCurrent,
                        [key]: to
                    }
                }, {})
            }
        }, {cnf: to})
}
const apollo = new Apollo();

(async () => {


    const seed = apollo.createRandomSeed().seed;
    const privateKey = apollo.createPrivateKey({
        [KeyProperties.type]: "EC",
        [KeyProperties.curve]: Curve.SECP256K1,
        [KeyProperties.seed]: Buffer.from(seed.value).toString('hex')
    });
    const publicKey = privateKey.publicKey();
    const header = {
        alg: "ES256K",
    }
    const x = Buffer.from(publicKey.getProperty(KeyProperties.curvePointX))
    const y = Buffer.from(publicKey.getProperty(KeyProperties.curvePointY))


    const createSDJWT = (claims = []) => {
        const payload = {
            iss: 'prism:did',
            iat: 1516239022,
            exp: 1735689661,
            cnf: {
                jwk: {
                    kty: 'EC',
                    crv: 'secp256k1',
                    x: x.toString(),
                    y: y.toString(),
                },
            },
            sub:"javi",
            ...claims.reduce((all, claim)=> ({...all, claim}, {}))
        }
        const sd = new SdJwt({
            header,
            payload
        });
        sd.withHasher({algorithm: HasherAlgorithm.Sha256, hasher: (disclosure) => {
            const keyStr = Buffer.from(disclosure, 'base64url').toString()
            const [salt,  disclosed] = JSON.parse(keyStr);
            const sha256 = new HMAC(SHA256, salt)
            sha256.update(disclosed);
            return Buffer.from(sha256.digest()).toString('base64Url')
        }});
        sd.withDisclosureFrame(parseClaims(claims, true));
        sd.withSaltGenerator((key) => {
            const sha256 = new HMAC(SHA256, linkSecret);
            const salt = Buffer.from(sha256.update(key).digest()).toString('base64url')
            console.log("salt", salt, key)
            return salt;
        });
        sd.withSigner(createSigner(privateKey));
        sd.signAndAdd()
        
        return sd
    }

    const claims = [{ sub:"javi", email:"elrib" }]
    const sd = createSDJWT(claims)
   
    sd.verifySignature(({message, signature}) => {
        if (publicKey.canVerify()) {
            return publicKey.verify(Buffer.from(message), Buffer.from(signature))
        }
        return false
    })
    console.log("Compat Disclosed JWT", sd.toCompact());

    debugger;




})();