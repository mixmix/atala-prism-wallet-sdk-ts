"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDUrl = void 0;
class DIDUrl {
    did;
    path;
    parameters;
    fragment;
    constructor(did, path = [], parameters = new Map(), fragment = "") {
        this.did = did;
        this.path = path;
        this.parameters = parameters;
        this.fragment = fragment;
    }
    string() {
        return `${this.did}${this.fragmentString()}`;
    }
    pathString() {
        return `/${this.path.join("/")}`;
    }
    queryString() {
        return `?${Array.from(this.parameters.entries())
            .map(([key, value]) => `${key}=${value}`)
            .join("&")}`;
    }
    fragmentString() {
        return `#${this.fragment}`;
    }
}
exports.DIDUrl = DIDUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEVXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RvbWFpbi9tb2RlbHMvRElEVXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsTUFBTTtJQUNqQixHQUFHLENBQU07SUFDVCxJQUFJLENBQVc7SUFDZixVQUFVLENBQXNCO0lBQ2hDLFFBQVEsQ0FBUztJQUVqQixZQUNFLEdBQVEsRUFDUixPQUFpQixFQUFFLEVBQ25CLGFBQWtDLElBQUksR0FBRyxFQUFFLEVBQzNDLFFBQVEsR0FBRyxFQUFFO1FBRWIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzdDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzthQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBbkNELHdCQW1DQyJ9