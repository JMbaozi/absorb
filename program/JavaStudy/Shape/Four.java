package Shape;

public class Four {
	public double A;
	public double Area;
	public double Perimeter;
	public Four(double a){
		this.A = a;
	}
	public void ShowArea(){
		this.Area = A*A;
		System.out.println("面积：" + this.Area);
	}
	public void ShowPerimeter(){
		this.Perimeter = 4*A;
		System.out.println("周长：" + this.Perimeter);
	}
}
