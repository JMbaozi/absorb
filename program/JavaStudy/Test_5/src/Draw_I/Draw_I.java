package Draw_I;

import java.io.FileOutputStream;
import java.io.IOException;

/**
 * ����������ѡȡĳһ����д��ĸ����дһ�����򡣸ó���ͨ�����ļ���data.txt��д�롮 �����ո��ַ�)�͡�*��(���ַ�)��ɸ���ĸ��ͼ�������ڳ������н���֮��ͨ���ı��༭��Ӧ�����Կ������´������ļ���data.txt�����ɿո��ַ������ַ���ɵ�ָ����д��ĸ��ͼ����
 * @author JMbaozi
 *
 */
public class Draw_I {
	public void SaveFile() throws IOException {
		FileOutputStream f = new FileOutputStream("E:\\JavaStudy\\Test_5\\src\\Draw_I\\data.txt");
		String str = "";
		for(int i=0;i<10;++i) {
			if(i==0||i==9) {
				str += "******\n";
			}else {
				str += "  **  \n";
			}
		}
		byte[] b = str.getBytes();
		f.write(b);
		f.close();
		System.out.println("������ĸI��ɣ�");
	}
	public static void main(String args[]) throws IOException {
		Draw_I i = new Draw_I();
		i.SaveFile();
	}
}
