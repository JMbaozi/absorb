package ClassLearn;

import java.util.Scanner;

/**
 * Circle¿‡≤‚ ‘
 * @author JMbaozi
 *
 */
public class CircleTest {

	public static void main(String[] args) {
//		Circle circle1 = new Circle();
//		circle1.showPerimeter();
//		circle1.showArea();
//		
//		Circle circle2 = new Circle(25.33);
//		circle2.showPerimeter();
//		circle2.showArea();
		
		//CircleV2
		Scanner input = new Scanner(System.in);
		System.out.println("«Î ‰»Î‘≤∞Îæ∂£∫");
		double radius = input.nextDouble();
		input.close();
		CircleV2 circle = new CircleV2(radius);
		System.out.println("√Êª˝£∫" + circle.getArea());
	}

}
