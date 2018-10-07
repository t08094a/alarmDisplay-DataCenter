import { element, by, ElementFinder } from 'protractor';

export class ResourceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-resource div table .btn-danger'));
    title = element.all(by.css('jhi-resource div h2#page-heading span')).first();

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

export class ResourceUpdatePage {
    pageTitle = element(by.id('jhi-resource-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    alarmInfoSelect = element(by.id('field_alarmInfo'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async alarmInfoSelectLastOption() {
        await this.alarmInfoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async alarmInfoSelectOption(option) {
        await this.alarmInfoSelect.sendKeys(option);
    }

    getAlarmInfoSelect(): ElementFinder {
        return this.alarmInfoSelect;
    }

    async getAlarmInfoSelectedOption() {
        return this.alarmInfoSelect.element(by.css('option:checked')).getText();
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

export class ResourceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-resource-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-resource'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
