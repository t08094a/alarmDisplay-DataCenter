import { element, by, ElementFinder } from 'protractor';

export class EquipmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-equipment div table .btn-danger'));
    title = element.all(by.css('jhi-equipment div h2#page-heading span')).first();

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

export class EquipmentUpdatePage {
    pageTitle = element(by.id('jhi-equipment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    resourceSelect = element(by.id('field_resource'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async resourceSelectLastOption() {
        await this.resourceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async resourceSelectOption(option) {
        await this.resourceSelect.sendKeys(option);
    }

    getResourceSelect(): ElementFinder {
        return this.resourceSelect;
    }

    async getResourceSelectedOption() {
        return this.resourceSelect.element(by.css('option:checked')).getText();
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

export class EquipmentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-equipment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-equipment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
