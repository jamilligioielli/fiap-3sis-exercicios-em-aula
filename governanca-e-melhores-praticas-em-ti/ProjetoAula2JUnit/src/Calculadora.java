public class Calculadora {
	
	public int somar(int numero1, int numero2) {
		return numero1 + numero2;
	}
	
	public int subtrair(int numero1, int numero2) {
		return numero1 - numero2;
	}
	
	public int multiplicar(int numero1, int numero2) {
		return numero1 * numero2;
	}
	
	public double dividir(int numero1, int numero2) {
		if(numero1 == 0)
			return 0;
		return  numero2 / ((double) numero1);
	}
}
