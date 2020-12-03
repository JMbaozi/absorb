package GrandingData;

import java.io.*;
import java.util.Arrays;
import java.util.Scanner;

/**
 * ��дһ������Ҫ������5��ѧ���ĳɼ�(��0��100������)��������5�������浽�ļ���data.txt���С�Ȼ���ٱ�дһ�����򣬴��ļ���data.txt���ж�ȡ��5��ѧ���ĳɼ������㲢������ǵ�ƽ������Ȼ���ٰ���С�����˳�������5��ѧ���ĳɼ���
 * @author JMbaozi
 *
 */
public class GrandData{
	public void Output() throws IOException {
		FileOutputStream fos = new FileOutputStream("E:\\JavaStudy\\Test_5\\src\\GrandingData\\GrandData.txt");
		String str = "";
		for(int i=0;i<5;++i) {
			System.out.printf("�������%d���ɼ�:",i+1);
			Scanner input = new Scanner(System.in);
			str += Float.toString(input.nextFloat());
			if(i!=4) {
				str += ",";
			}
		}
		System.out.println("������ɣ�");
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
		System.out.printf("ƽ��ֵ��%.1f\n",(sum/5.0));
		Arrays.sort(g);
		System.out.println("�ɼ�����");
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
