const world = 'world';

export default class HelloWorld {
    hello(who: string = world): string {
        return `Hello ${who}! `;
    }
}