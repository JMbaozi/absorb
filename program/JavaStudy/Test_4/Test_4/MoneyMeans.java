package Test_4;

import java.util.Scanner;

public class MoneyMeans {
    public static void Allmeans(int n)
    {
        for(int i=0;i<=n;i++)
            for(int j=0;j<=n/2;j++)
                for(int k=0;k<=n/5;k++)
                    if(i+2*j+5*k==n)
                    {  System.out.print(n+"������"+i+"��1Ԫ "+j+"��2Ԫ "
                                +k+"��5Ԫ���");
                    System.out.println();
                    }
    }
	public static void main(String[] args) {
		// TODO �Զ����ɵķ������
		System.out.println("��������n:");
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		Allmeans(n);
	}
}
