package Shape;

public class UseShape {

	public static void main(String[] args) {
		// TODO �Զ����ɵķ������
		
		//������
		Three t1 = new Three(3,4,5);
		t1.ShowPerimeter();
		t1.ShowArea();
		
		//������
		Four f1 = new Four(6.66);
		f1.ShowArea();
		f1.ShowPerimeter();
		
		//Բ��
		Circle c1 = new Circle(3.33);
		c1.ShowArea();
		c1.ShowPerimeter();
		
		//�����
		Five F1 = new Five(2.23);
		F1.ShowArea();
		F1.ShowPerimeter();
		
	}

}
