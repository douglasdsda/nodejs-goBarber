import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvier {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}
