import static org.junit.Assert.*;

import org.junit.Test;

public class CalculadoraTest {
	Calculadora calc = new Calculadora();
	
	@Test
	public void somarDoisNumerosInteirosTest() {
		int exp = 10;
		int result = calc.somar(5, 5);
		assertEquals(exp, result);
	}
	
	@Test
	public void subtrairDoisNumerosInteirosTest() {
		int exp = 5;
		int result = calc.subtrair(10, 5);
		assertEquals(exp, result);
	}
	
	@Test
	public void multiplicarDoisNumerosInteirosTest() {
		int exp = 50;
		int result = calc.multiplicar(10, 5);
		assertEquals(exp, result);
	}
	
	@Test
	public void dividirDoisNumerosInteirosTest() {
		double exp = 2.5;
		double result = calc.dividir(2, 5);
		assertEquals(exp, result, 0.5);
	}
	
	@Test
	public void dividirPor0NumeroInteiroTest() {
		double result = calc.dividir(0, 5);
		assertEquals(0, result, 0);
	}

}
