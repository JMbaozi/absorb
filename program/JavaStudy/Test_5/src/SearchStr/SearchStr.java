package SearchStr;

import java.io.*;
import java.util.Scanner;

/**
 * ��дһ������Ҫ���ܹ��ڵ�ǰ·���µ������ļ��в��Ҹ������ַ������������ַ����ɳ������в���(��main��Ա�����Ĳ���)ָ����
 * @author JMbaozi
 *
 */
public class SearchStr {
	public static int mount = 0;
    public static void main(String[] args) 
    {
		String filename = "E:\\JavaStudy\\Test_5\\src\\SearchStr";
		//����һ�� File ʵ������ʾ·������ָ��·���������ļ�
		File file = new File(filename);
		System.out.println("������Ҫ��ѯ�����ݣ�");
		Scanner input = new Scanner(System.in);
		String in = input.nextLine();
		if(in.length()>0) //����Ҫ���ҵĹؼ���
		{
			findFile(file, in);
			print(in);
		}
		input.close();
	}
    public static boolean isTrueFile(File file) 
    {
		if(!file.exists() || !file.canRead())
		return false;
		if (file.getName().startsWith("."))
		return false;
		if (file.getName().endsWith("."))
	    return false;
		return true;
	}
    public static void findFile(File file, String word) 
    {
		File[] listFiles = file.listFiles(); 
		//�õ�һ��File���飬��Ĭ���ǰ��ļ�����޸����������
		for (int i = 0; i < listFiles.length; i++) 
		{
		   if (listFiles[i].isDirectory())
		   findFile(listFiles[i], word);
		   else if (isTrueFile(listFiles[i]))
		   search(listFiles[i], word);
		}
	}
    public static void search(File file, String word) 
    {
		try 
		{
			int j = 0, k = 0, ch = 0;
			String str = null;
			FileReader in = new FileReader(file);
			while ((ch = in.read()) != -1) 
			{
				str += (char) ch;
			}
			if (str != null)
			{
				while (str.indexOf(word, j) != -1) 
				{
					k++;
					j = str.indexOf(word, j) + 1; // ���ص�һ�γ��ֵ�ָ�����ַ����ڴ��ַ����е�����
				}
			}
			if (k > 0) 
			{
				System.out.println("��" + file.getAbsolutePath() + "��" + k+ "���ؼ���");
				mount++;
			}
			in.close();
		} 
		catch (FileNotFoundException e)
		{
			e.printStackTrace();
		} 
		catch (IOException e)
		{
			e.printStackTrace();
		}
	}
    public static void print(String word)
    {
		if (mount != 0) 
		{
			System.out.println("�ҵ�" + mount + "���ı������ؼ���" + word + "!");
		} 
		else 
		{
			System.out.println("û���ҵ���Ӧ���ļ�");
		}
	}
}
