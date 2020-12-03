package SearchStr;

import java.io.*;
import java.util.Scanner;

/**
 * 编写一个程序，要求能够在当前路径下的所有文件中查找给定的字符串。给定的字符串由程序运行参数(即main成员方法的参数)指定。
 * @author JMbaozi
 *
 */
public class SearchStr {
	public static int mount = 0;
    public static void main(String[] args) 
    {
		String filename = "E:\\JavaStudy\\Test_5\\src\\SearchStr";
		//创建一个 File 实例，表示路径名是指定路径参数的文件
		File file = new File(filename);
		System.out.println("请输入要查询的内容：");
		Scanner input = new Scanner(System.in);
		String in = input.nextLine();
		if(in.length()>0) //输入要查找的关键字
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
		//得到一个File数组，它默认是按文件最后修改日期排序的
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
					j = str.indexOf(word, j) + 1; // 返回第一次出现的指定子字符串在此字符串中的索引
				}
			}
			if (k > 0) 
			{
				System.out.println("在" + file.getAbsolutePath() + "有" + k+ "个关键字");
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
			System.out.println("找到" + mount + "个文本包含关键字" + word + "!");
		} 
		else 
		{
			System.out.println("没有找到相应的文件");
		}
	}
}
