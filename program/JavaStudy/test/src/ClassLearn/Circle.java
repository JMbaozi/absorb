package ClassLearn;

import java.util.Scanner;

/**
 * 圆类
 * @author JMbaozi
 *
 */
public class Circle {
	public double radius;
	public double perimeter;
	public double area;
	public Circle() {
		inputRaius();
	}
	public Circle(double r) {
		if(r > 0) {
			radius = r;
		}else {
			inputRaius();
		}
	}
	private void inputRaius() {
		Scanner input = new Scanner(System.in);
		System.out.println("请输入半径：");
		radius = input.nextDouble();
		input.close();
	}
	public void showPerimeter() {
		if(radius <= 0) {
			inputRaius();
		}
		perimeter = 2 * Math.PI * radius;
		System.out.println("周长为：" + perimeter) ;
	}
	public void showArea() {
		if(radius <= 0) {
			inputRaius();
		}
		area = Math.PI * Math.pow(radius, 2);
		System.out.println("面积为：" + area);
	}
}
