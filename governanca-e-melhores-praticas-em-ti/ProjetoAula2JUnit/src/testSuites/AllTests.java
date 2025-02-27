package testSuites;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import calculadora.CalculadoraTest;
import desafio.ClassificadoraPrecoTest;

@RunWith(Suite.class)
@SuiteClasses({ ClassificadoraPrecoTest.class, CalculadoraTest.class })
public class AllTests {

}
