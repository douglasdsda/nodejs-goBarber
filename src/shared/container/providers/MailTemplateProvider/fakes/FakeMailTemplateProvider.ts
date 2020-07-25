import IMailTemplateProvier from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvier {
    public async parse(): Promise<string> {
        return 'Mail content';
    }
}

export default FakeMailTemplateProvider;
