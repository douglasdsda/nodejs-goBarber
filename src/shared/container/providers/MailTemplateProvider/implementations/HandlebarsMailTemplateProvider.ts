import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvier from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvier {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateFileContent);
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
