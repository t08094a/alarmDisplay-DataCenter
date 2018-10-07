import { element, by, ElementFinder } from 'protractor';

export class KeywordsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-keywords div table .btn-danger'));
    title = element.all(by.css('jhi-keywords div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class KeywordsUpdatePage {
    pageTitle = element(by.id('jhi-keywords-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    keywordInput = element(by.id('field_keyword'));
    emergencyKeywordInput = element(by.id('field_emergencyKeyword'));
    bInput = element(by.id('field_b'));
    rInput = element(by.id('field_r'));
    sInput = element(by.id('field_s'));
    tInput = element(by.id('field_t'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setKeywordInput(keyword) {
        await this.keywordInput.sendKeys(keyword);
    }

    async getKeywordInput() {
        return this.keywordInput.getAttribute('value');
    }

    async setEmergencyKeywordInput(emergencyKeyword) {
        await this.emergencyKeywordInput.sendKeys(emergencyKeyword);
    }

    async getEmergencyKeywordInput() {
        return this.emergencyKeywordInput.getAttribute('value');
    }

    async setBInput(b) {
        await this.bInput.sendKeys(b);
    }

    async getBInput() {
        return this.bInput.getAttribute('value');
    }

    async setRInput(r) {
        await this.rInput.sendKeys(r);
    }

    async getRInput() {
        return this.rInput.getAttribute('value');
    }

    async setSInput(s) {
        await this.sInput.sendKeys(s);
    }

    async getSInput() {
        return this.sInput.getAttribute('value');
    }

    async setTInput(t) {
        await this.tInput.sendKeys(t);
    }

    async getTInput() {
        return this.tInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class KeywordsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-keywords-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-keywords'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
