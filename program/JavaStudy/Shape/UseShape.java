package Shape;

public class UseShape {

	public static void main(String[] args) {
		// TODO 自动生成的方法存根
		
		//三角形
		Three t1 = new Three(3,4,5);
		t1.ShowPerimeter();
		t1.ShowArea();
		
		//正方形
		Four f1 = new Four(6.66);
		f1.ShowArea();
		f1.ShowPerimeter();
		
		//圆形
		Circle c1 = new Circle(3.33);
		c1.ShowArea();
		c1.ShowPerimeter();
		
		//五边形
		Five F1 = new Five(2.23);
		F1.ShowArea();
		F1.ShowPerimeter();
		
	}

}
