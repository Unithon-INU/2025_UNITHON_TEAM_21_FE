import {XMLParser} from 'fast-xml-parser';

export function xml2Json(xml: string): any {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        parseAttributeValue: true,
        trimValues: true,
        parseTagValue: true,
    });
    return parser.parse(xml).response;
}
