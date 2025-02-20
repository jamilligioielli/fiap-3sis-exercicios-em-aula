
public class Main {

	public static void main(String[] args) {
		Calculadora calc = new Calculadora();
		int n1 = 5, n2 = 100;
		int soma = calc.somar(n1, n2);
		System.out.println("Soma de dois numeros " + soma);
		int subtracao = calc.subtrair(n1, n2);
		System.out.println("Subtracao de dois numeros " + subtracao);
		int multiplicacao = calc.multiplicar(n1, n2);
		System.out.println("Multiplicacao de dois numeros " + multiplicacao);
		double divisao = calc.dividir(n1, n2);
		System.out.println("Divisao de dois numeros " + divisao);
	}

}
