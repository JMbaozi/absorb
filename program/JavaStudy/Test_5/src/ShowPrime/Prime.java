package ShowPrime;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Scanner;

/**
 * 编写一个程序。要求能够通过控制台窗口接受一个整数n，然后在文件“data.txt"中写入所有比n小的素数，最后通过控制台窗口分别显示每个数字(从0到9)在这些素数(比n小的素数)中出现的总次数。例如:在素数13中出现一次1和一次3;在素数32 082 509中出现两次0、两次2、一次3、一次5、一次8和一次9。
 * @author JMbaozi
 *
 */
public class Prime {
	public static int[] result = new int[1000];
	public static int flag = 0;//记录素数个数
	public static int[] count_num = {0,1,2,3,4,5,6,7,8,9};//统计的数字
	public static int[] count_sum = {0,0,0,0,0,0,0,0,0,0};//统计的个数
	public void GetPrime(int n) throws IOException {
		if(n<=2) {
			System.out.println("没有！");
		}else {
			for(int i=2;i<n;i++) {
				boolean b = true;
				for(int j=2;j<=Math.sqrt(i);j++) {
					if(i%j==0) {
						b = false;
						break;
					}
				}
				if(b) {
					result[flag] = i;
					flag += 1;
				}
			}
		}
		FileOutputStream fos = new FileOutputStream("E:\\JavaStudy\\Test_5\\src\\ShowPrime\\PrimeData.txt");
		String str = "";
		for(int i=0;i<flag;++i) {
			int num = result[i];
			str += Integer.toString(num);
			if(i!=(flag-1)) {
				str += ",";
			}
		}
		System.out.println("输入完成！");
		byte[] b = str.getBytes();
		fos.write(b);
		fos.close();
	}
	public void GetCountSum() {//int转字符，然后分割再转int，最后按个比较
		for(int i=0;i<flag;i++) {
			String r_str = Integer.toString(result[i]);
			String[] num_str = r_str.split("");
			for(String s:num_str) {
				int num = Integer.parseInt(s);
				for(int j=0;j<10;j++) {
					if(count_num[j]==num)
						count_sum[j] += 1;
				}
			}
		}
		for(int i=0;i<10;i++) {
			System.out.printf("%d个数:%d  ",i,count_sum[i]);
		}
	}
	public static void main(String[] args) throws IOException {
		System.out.println("请输入正整数n:");
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		Prime p = new Prime();
		p.GetPrime(n);
		p.GetCountSum();
	}
}
