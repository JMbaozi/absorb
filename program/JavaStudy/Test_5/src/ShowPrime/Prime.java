package ShowPrime;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Scanner;

/**
 * ��дһ������Ҫ���ܹ�ͨ������̨���ڽ���һ������n��Ȼ�����ļ���data.txt"��д�����б�nС�����������ͨ������̨���ڷֱ���ʾÿ������(��0��9)����Щ����(��nС������)�г��ֵ��ܴ���������:������13�г���һ��1��һ��3;������32 082 509�г�������0������2��һ��3��һ��5��һ��8��һ��9��
 * @author JMbaozi
 *
 */
public class Prime {
	public static int[] result = new int[1000];
	public static int flag = 0;//��¼��������
	public static int[] count_num = {0,1,2,3,4,5,6,7,8,9};//ͳ�Ƶ�����
	public static int[] count_sum = {0,0,0,0,0,0,0,0,0,0};//ͳ�Ƶĸ���
	public void GetPrime(int n) throws IOException {
		if(n<=2) {
			System.out.println("û�У�");
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
		System.out.println("������ɣ�");
		byte[] b = str.getBytes();
		fos.write(b);
		fos.close();
	}
	public void GetCountSum() {//intת�ַ���Ȼ��ָ���תint����󰴸��Ƚ�
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
			System.out.printf("%d����:%d  ",i,count_sum[i]);
		}
	}
	public static void main(String[] args) throws IOException {
		System.out.println("������������n:");
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		Prime p = new Prime();
		p.GetPrime(n);
		p.GetCountSum();
	}
}
