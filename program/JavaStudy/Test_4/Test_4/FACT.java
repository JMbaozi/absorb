package Test_4;
/**
 * 请编写程序。要求分别采用递归方法和非递归方法计算n的阶乘:
n!=n*（n-1)*…*l，其中，n为大于0的整数。要求在控制台窗口中分别输出采用这两种方法计算从1到10的阶乘结果。
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
		// TODO 自动生成的方法存根
		for(int i=1;i<=10;i++){
			getFACT_1(i);
		}
		for(int i=1;i<=10;i++){
			System.out.println(getFACT_2(i));
		}
	}
}
