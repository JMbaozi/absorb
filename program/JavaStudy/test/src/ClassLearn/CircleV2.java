package ClassLearn;

import java.util.Scanner;

/**
 * 圆类版本2 私有变量 封装
 * @author JMbaozi
 *
 */
public class CircleV2 {
	private double radius;
	private double perimeter;
	private double area;
	
	public CircleV2() {}
	
	public CircleV2(double radius) {
		this.setRadius(radius);
	}

	public double getRadius() {
		return radius;
	}
	public void setRadius(double radius) {
		if(radius <= 0) {
			radius = 1;
		}else {
			this.radius = radius;
		}
	}
	public double getPerimeter() {
		perimeter = 2 * Math.PI * radius;
		return perimeter;
	}
	public double getArea() {
		area = Math.PI * Math.pow(radius, 2);
		return area;
	}
	
}
