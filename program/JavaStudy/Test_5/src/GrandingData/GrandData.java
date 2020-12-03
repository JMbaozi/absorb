package GrandingData;

import java.io.*;
import java.util.Arrays;
import java.util.Scanner;

/**
 * 编写一个程序。要求输入5个学生的成绩(从0到100的整数)，并将这5个数保存到文件“data.txt”中。然后再编写一个程序，从文件“data.txt”中读取这5个学生的成绩，计算并输出它们的平均数，然后再按从小到大的顺序输出这5个学生的成绩。
 * @author JMbaozi
 *
 */
public class GrandData{
	public void Output() throws IOException {
		FileOutputStream fos = new FileOutputStream("E:\\JavaStudy\\Test_5\\src\\GrandingData\\GrandData.txt");
		String str = "";
		for(int i=0;i<5;++i) {
			System.out.printf("请输入第%d个成绩:",i+1);
			Scanner input = new Scanner(System.in);
			str += Float.toString(input.nextFloat());
			if(i!=4) {
				str += ",";
			}
		}
		System.out.println("输入完成！");
		byte[] b = str.getBytes();
		fos.write(b);
		fos.close();
	}
	public void InputAndAveragevalue() throws IOException {
		FileInputStream in = new FileInputStream("E:\\JavaStudy\\Test_5\\src\\GrandingData\\GrandData.txt");
		String data = "";
		byte[] bys = new byte[1024];
		if(in.read(bys)!=-1) {
			data = new String(bys);
		}
		String[] nums = data.split(",");
		float sum = 0;
		float[] g = new float[5];
		for(int i=0;i<nums.length;i++) {
			sum += Float.parseFloat(nums[i]);
			g[i] = Float.parseFloat(nums[i]);
		}
		System.out.printf("平均值：%.1f\n",(sum/5.0));
		Arrays.sort(g);
		System.out.println("成绩排序：");
		for(float i:g) {
			System.out.println(i);
		}
		in.close();
	}
	public static void main(String[] args) throws IOException {
		GrandData t = new GrandData();
		t.Output();
		t.InputAndAveragevalue();
	}
}
