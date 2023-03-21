import { UrlWithParsedQuery, parse } from "url";

export class Urls {
    public static parseUrl(url: string): UrlWithParsedQuery {
        return parse(url, true);
    }
}