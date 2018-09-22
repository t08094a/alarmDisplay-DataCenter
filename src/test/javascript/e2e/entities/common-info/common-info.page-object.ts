import { element, by, ElementFinder } from 'protractor';

export class CommonInfoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-common-info div table .btn-danger'));
    title = element.all(by.css('jhi-common-info div h2#page-heading span')).first();

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

export class CommonInfoUpdatePage {
    pageTitle = element(by.id('jhi-common-info-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    showStartDateInput = element(by.id('field_showStartDate'));
    showEndDateInput = element(by.id('field_showEndDate'));
    alarmRelevantInput = element(by.id('field_alarmRelevant'));
    alarmRelevantStartDateInput = element(by.id('field_alarmRelevantStartDate'));
    alarmRelevantEndDateInput = element(by.id('field_alarmRelevantEndDate'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setShowStartDateInput(showStartDate) {
        await this.showStartDateInput.sendKeys(showStartDate);
    }

    async getShowStartDateInput() {
        return this.showStartDateInput.getAttribute('value');
    }

    async setShowEndDateInput(showEndDate) {
        await this.showEndDateInput.sendKeys(showEndDate);
    }

    async getShowEndDateInput() {
        return this.showEndDateInput.getAttribute('value');
    }

    getAlarmRelevantInput() {
        return this.alarmRelevantInput;
    }
    async setAlarmRelevantStartDateInput(alarmRelevantStartDate) {
        await this.alarmRelevantStartDateInput.sendKeys(alarmRelevantStartDate);
    }

    async getAlarmRelevantStartDateInput() {
        return this.alarmRelevantStartDateInput.getAttribute('value');
    }

    async setAlarmRelevantEndDateInput(alarmRelevantEndDate) {
        await this.alarmRelevantEndDateInput.sendKeys(alarmRelevantEndDate);
    }

    async getAlarmRelevantEndDateInput() {
        return this.alarmRelevantEndDateInput.getAttribute('value');
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

export class CommonInfoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-commonInfo-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-commonInfo'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
