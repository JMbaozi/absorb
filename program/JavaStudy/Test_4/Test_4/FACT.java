package Test_4;
/**
 * ���д����Ҫ��ֱ���õݹ鷽���ͷǵݹ鷽������n�Ľ׳�:
n!=n*��n-1)*��*l�����У�nΪ����0��������Ҫ���ڿ���̨�����зֱ�������������ַ��������1��10�Ľ׳˽����
 * @author JMbaozi
 *
 */
public class FACT {
	public static void getFACT_1(int n){
		int sum = 1;
		for(int i=1;i<=n;i++){
			sum = sum*i;
		}
		System.out.println(sum);
	}
	public static long getFACT_2(int n){
		if(n <= 1)
		{
			return 1;
		}
		else
		{
			return n * getFACT_2(n - 1);
		}
	}
	public static void main(String[] args) {
		// TODO �Զ����ɵķ������
		for(int i=1;i<=10;i++){
			getFACT_1(i);
		}
		for(int i=1;i<=10;i++){
			System.out.println(getFACT_2(i));
		}
	}
}
