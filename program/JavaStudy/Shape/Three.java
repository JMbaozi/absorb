package Shape;
public class Three {
	public double A,B,C;
	public double Area;
	public double Perimeter;
	
	public Three(double a,double b,double c){
		this.A = a;
		this.B = b;
		this.C = c;
	}
	public void ShowArea(){
		double Pt = ((this.A+this.B+this.C)/2.0);
		this.Area = Math.sqrt(Pt*(Pt-A)*(Pt-B)*(Pt-C));
		System.out.println("面积：" + this.Area);
	}
	public void ShowPerimeter(){
		this.Perimeter = this.A + this.B + this.C;
		System.out.println("周长：" + this.Perimeter);
	}
}
