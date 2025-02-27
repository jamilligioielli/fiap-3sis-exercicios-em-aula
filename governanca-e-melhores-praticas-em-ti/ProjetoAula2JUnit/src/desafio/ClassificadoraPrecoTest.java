package desafio;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import org.junit.Before;
import org.junit.After;

public class ClassificadoraPrecoTest {
	
	ClassificadoraPreco classificadora = new ClassificadoraPreco();
	public static int contadorTeste = 1;
	
	@Before
	public void beforeEachTest() {
		System.out.println("Vou executar o teste  " + contadorTeste);
	}
	
	@After
	public void afterEachTest() {
		System.out.println("Terminei de executar o teste  " + contadorTeste);
		contadorTeste++;
	}

	@Test
	public void classificaProdutosPorPrecoTest() {
		List<Produto> produtos = new ArrayList<Produto>();
		Produto produto1 = new Produto("1234", 500);
		Produto produto2 = new Produto("1234", 20);
		Produto produto3 = new Produto("0234", 10);
		produtos.add(produto1);
		produtos.add(produto3);
		produtos.add(produto2);
		
		List<Produto> resultado = classificadora.classificaProdutosPorPreco(produtos);
		
		List<Produto> produtosOrdenados = new ArrayList<Produto>();
		produtosOrdenados.add(produto3);
		produtosOrdenados.add(produto2);
		produtosOrdenados.add(produto1);
		
		assertArrayEquals(produtosOrdenados.toArray(), resultado.toArray());
		
//		int primeiroPreco = resultado.get(0).preco;
//		int listaUltimoIndex = resultado.size() - 1;
//		String ultimoId = resultado.get(listaUltimoIndex).codigo;
//		int ultimoPreco = resultado.get(listaUltimoIndex).preco;
//		
//		assertEquals(10, primeiroPreco);
//		assertEquals("1234", ultimoId);
//		assertFalse(ultimoPreco == 20);
	}
	
	@Test
	public void classificaProdutosPorPrecoTest2() {
		List<Produto> produtos = new ArrayList<Produto>();
		Produto produto1 = new Produto("1234", 500);
		Produto produto2 = new Produto("1234", 20);
		Produto produto3 = new Produto("0234", 10);
		produtos.add(produto1);
		produtos.add(produto3);
		produtos.add(produto2);
		
		List<Produto> resultado = classificadora.classificaProdutosPorPreco(produtos);
		
		List<Produto> produtosOrdenados = new ArrayList<Produto>();
		produtosOrdenados.add(produto3);
		produtosOrdenados.add(produto2);
		produtosOrdenados.add(produto1);
		
		for(int i=0; i < resultado.size(); i++) {
			assertEquals(produtosOrdenados.get(i).codigo, resultado.get(i).codigo);
			assertEquals(produtosOrdenados.get(i).preco, resultado.get(i).preco);
		}
	}
}
