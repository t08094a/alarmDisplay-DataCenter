package de.leif.ffw.datacenter.cucumber.stepdefs;

import de.leif.ffw.datacenter.DataCenterApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = DataCenterApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
