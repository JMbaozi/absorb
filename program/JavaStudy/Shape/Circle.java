package Shape;

public class Circle {
	public double R;
	public double Area;
	public double Perimeter;
	public Circle(double r){
		this.R = r;
	}
	
	public void ShowArea(){
		this.Area = Math.PI * this.R * this.R;
		System.out.println("�����" + this.Area);
	}
	public void ShowPerimeter(){
		this.Perimeter = 2 * Math.PI * R;
		System.out.println("�ܳ���" + this.Perimeter);
	}
}
