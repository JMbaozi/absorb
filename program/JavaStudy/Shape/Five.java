3package Shape;

public class Five {
	public double B;
	public double Area;
	public double Perimeter;
	public Five(double b){
		this.B = b;
	}
	
	public void ShowArea(){
		this.Area = 5*Math.pow(B,2)/(4*Math.tan(36*Math.PI/180));
		System.out.println("面积：" + this.Area);
	}
	public void ShowPerimeter(){
		this.Perimeter = 5*this.B;
		System.out.println("周长：" + this.Perimeter);
	}
}
