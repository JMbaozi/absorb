package Test_4;

import java.util.Scanner;

public class MoneyMeans {
    public static void Allmeans(int n)
    {
        for(int i=0;i<=n;i++)
            for(int j=0;j<=n/2;j++)
                for(int k=0;k<=n/5;k++)
                    if(i+2*j+5*k==n)
                    {  System.out.print(n+"可以由"+i+"个1元 "+j+"个2元 "
                                +k+"个5元组成");
                    System.out.println();
                    }
    }
	public static void main(String[] args) {
		// TODO 自动生成的方法存根
		System.out.println("请输入金额n:");
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		Allmeans(n);
	}
}
