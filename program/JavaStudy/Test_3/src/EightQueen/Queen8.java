package EightQueen;

public class Queen8 {
	int Max=8;//八个皇后
	static int Count=0;//计数
	int[] arry=new int[Max];
	public static void main(String[] args) {
		//	new Queue8().Check(0);其中Check(0)代表从第一个开始检测
		new Queen8().Check(0);
		//统计合格种数 92种
		System.out.println("一共有"+Count+"种");
	}
	//主要检查入口
	private void Check(int n) {
		//n=Max代表一行全部检测完毕
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
	//打印一行的数据
	private void print() {
		Count++;
		for (int i = 0; i < Max; i++) {
			System.out.print(arry[i]+" ");
		}
		System.out.println();
	}
	//判断是否同一列(arry[i]==arry[n])或者在对角线(Math.abs(n-i)==Math.abs(arry[n]-arry[i]))
	private boolean Judge(int n) {
		for (int i = 0; i < n; i++) {
			if((arry[i]==arry[n])||(Math.abs(n-i)==Math.abs(arry[n]-arry[i]))) {
				return false;
			}
		}
		return true;
	}
}
