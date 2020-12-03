package Draw_I;

import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 请自行任意选取某一个大写字母，编写一个程序。该程序通过给文件“data.txt”写入‘ ’（空格字符)和‘*’(星字符)组成该字母的图案，即在程序运行结束之后，通过文本编辑器应当可以看到在新创建的文件“data.txt”中由空格字符和星字符组成的指定大写字母的图案。
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
		System.out.println("输入字母I完成！");
	}
	public static void main(String args[]) throws IOException {
		Draw_I i = new Draw_I();
		i.SaveFile();
	}
}
