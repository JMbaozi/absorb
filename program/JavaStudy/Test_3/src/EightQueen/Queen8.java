package EightQueen;

public class Queen8 {
	int Max=8;//�˸��ʺ�
	static int Count=0;//����
	int[] arry=new int[Max];
	public static void main(String[] args) {
		//	new Queue8().Check(0);����Check(0)����ӵ�һ����ʼ���
		new Queen8().Check(0);
		//ͳ�ƺϸ����� 92��
		System.out.println("һ����"+Count+"��");
	}
	//��Ҫ������
	private void Check(int n) {
		//n=Max����һ��ȫ��������
		if(n==Max) {
			print();
			return;
		}
		for (int i = 0; i < Max; i++) {
			arry[n]=i;
			if(Judge(n)) {
				Check(n+1);
			}
		}
	}
	//��ӡһ�е�����
	private void print() {
		Count++;
		for (int i = 0; i < Max; i++) {
			System.out.print(arry[i]+" ");
		}
		System.out.println();
	}
	//�ж��Ƿ�ͬһ��(arry[i]==arry[n])�����ڶԽ���(Math.abs(n-i)==Math.abs(arry[n]-arry[i]))
	private boolean Judge(int n) {
		for (int i = 0; i < n; i++) {
			if((arry[i]==arry[n])||(Math.abs(n-i)==Math.abs(arry[n]-arry[i]))) {
				return false;
			}
		}
		return true;
	}
}
