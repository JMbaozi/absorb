import java.util.Arrays;
import java.util.Scanner;

/**
 * 基础篇
 * @author JMbaozi
 *
 */
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("你好，世界！");
		
//		输入半径计算圆面积
//		Scanner input = new Scanner(System.in);
//		System.out.printf("请输入半径r：");
//		double radius = input.nextDouble();
//		double area = 3.14 * radius * radius;
//		System.out.printf("圆的面积为：%.2f\n",area);
//		input.close();
		
//		num++ 和 ++num的区别
//		int num1 = 3,num2 = 4;
//		int result1 = num1++;	//后置先赋值再加一
//		System.out.printf("%d\n%d\n",result1,num1);
//		int result2 = ++num2;	//前置先加一再赋值
//		System.out.printf("%d\n%d\n",result2,num2);
		
//		if判断
//		Scanner input = new Scanner(System.in);
//		System.out.print("请输入硬盘盘符：");
//		char ch = input.next().charAt(0);
//		if(ch >= 'A' && ch <= 'Z')
//			System.out.println("合法盘符名称！");
//		else
//			System.err.println("非法盘符名称！");
		
//		if判断、*= += -= \= 的应用(物品打折)
//		double LV = 35000.0;
//		double HM = 11044.5;
//		double CN = 1525.0;
//		double Total = LV + HM + CN*5;
//		if(Total>50000) {
//			Total *= 0.7;
//		}else {
//			Total *= 0.9;
//		}
//		System.out.printf("总价为：%.2f",Total);
		
//		switch-case、while的用法
//		Scanner input = new Scanner(System.in);
//		int choice = -1;
//		System.out.println("1.登录游戏");
//		System.out.println("2.退出游戏");
//		System.out.print("输入选项：");
//		choice = input.nextInt();
//		if(choice == 1) {
//			while(choice != 0){
//				System.out.println("1.传音入室");
//				System.out.println("2.举目四望");
//				System.out.println("3.会会老友");
//				System.out.println("4.自我欣赏");
//				System.out.println("5.观察地形");
//				System.out.println("6.到此一游");
//				System.out.println("0.退出");
//				System.out.println("请输入选择：");
//				choice = input.nextInt();
//				switch(choice) {
//				case 0:
//					break;
//				case 1:
//					System.out.println("1.传音入室");
//					continue;
//				case 2:
//					System.out.println("2.举目四望");
//					continue;
//				case 3:
//					System.out.println("3.会会老友");
//					continue;
//				case 4:
//					System.out.println("4.自我欣赏");
//					continue;
//				case 5:
//					System.out.println("5.观察地形");
//					continue;
//				case 6:
//					System.out.println("请输入选择：");
//					continue;
//				default:
//					System.out.println("输入错误！");
//					System.exit(0);
//				}
//			}
//		}else if(choice == 2) {
//			System.exit(0);	//正常退出
//		}else {
//			System.out.println("输入错误，程序自动退出。");
//		}
		
//		for循坏，计算 100!的值
//		int result = 0;
//		for(double i=0;i<=100;i++) {
//			result += i;
//		}	//结束后变量i被销毁
//		System.out.printf("100!的值：%d",result);
		
//		1997年7月日历（香港回归）
//		System.out.println("星期一\t星期二\t星期三\t星期四\t星期五\t星期六\t星期日\t");
//		int date = 2;	//	星期数
//		for(int i=1;i<=31;i++) {
//			if(i == 1) { 	
//				System.out.printf("\t%d\t",i);
//				date += 1;
//			}else if(date < 7) {
//				System.out.printf("%d\t",i);
//				date += 1;
//			}else if(date == 7){
//				System.out.printf("%d\n",i);
//				date = 1;
//			}
//		}
		
//		数组实例:求最大、最小值和排序sort()
//		int[] nums = new int[10];
//		for(int i =0;i<nums.length;i++) {
//			nums[i] = ((int)(Math.random()*10000)) % 1001;	//0-1000
//		}
//		for (int i = 0; i < nums.length; i++) {
//			System.out.println(nums[i]);
//		}
//		int max = nums[0];
//		int min = nums[0];
//		for (int i = 1; i < nums.length; i++) {
//			if (max < nums[i]) {
//				max = nums[i];
//			}
//			if (min>nums[i]) {
//				min = nums[i];
//			}
//		}
//		System.out.println("Max:"+max);
//		System.out.println("Min:"+min);
//		Arrays.sort(nums);
//		for (int i = 0; i < nums.length; i++) {
//			System.out.println(nums[i]);
//		}
		
//		查询删除和插入数组元素
//		int[] nums_search = new int[100];
//		int[] nums_insert = new int[100];
//		int[] nums_delete = new int[100];
//		for (int i = 0; i < 10; i++) {
//			nums_search[i] = i+1;
//			nums_insert[i] = i+1;
//			nums_delete[i] = i+1;			
//		}
//		int insertIndex = -1;
//		int deleteIndex = -1;
//		int Num = -1;
//		int numIndex = -1;
//		System.out.println("请输入查询的数字：");
//		Scanner input_search = new Scanner(System.in);
//		Num = input_search.nextInt();
//		for (int i = 0; i < nums_search.length; i++) {
//			if(nums_search[i] == Num) {
//				numIndex = i;
//				break;
//			}
//		}
//		System.out.println("查询数字的下标：" + (numIndex + 1));
//		
//		System.out.println("请输入插入的数字和下标：");
//		Scanner insert_num = new Scanner(System.in);
//		Num = insert_num.nextInt();
//		Scanner insert_index = new Scanner(System.in);
//		numIndex = insert_index.nextInt();
//		for (int i = 95;i >= numIndex;i--) {
//			nums_insert[i+1] = nums_insert[i];
//			if(i == numIndex) {
//				nums_insert[i] = Num;
//			}
//		}
//		for (int i = 0; i < 11; i++) {
//			System.out.println(nums_insert[i]);
//		}
		//删除同理，不再赘述。
		
		
//方法Method
//		System.out.println("请输入今天星期几(数字)：");
//		int dayOfWeek = new Scanner(System.in).nextInt();
//		ShowWeekDayByEnglish(dayOfWeek);
//		ShowWeekDayByChinese(dayOfWeek);
		paramTest("参数测试", 1,2,3,4,5);
	}
	static void ShowWeekDayByEnglish(int dayOfWeek) {
		String[] weekdays = {"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"};
		System.out.println(weekdays[dayOfWeek-1]);
	}
	public static void ShowWeekDayByChinese(int dayOfWeek) {
		switch(dayOfWeek) {
		case 1:
			System.out.println("星期一");
			break;
		case 2:
			System.out.println("星期二");
			break;
		case 3:
			System.out.println("星期三");
			break;
		case 4:
			System.out.println("星期四");
			break;
		case 5:
			System.out.println("星期五");
			break;
		case 6:
			System.out.println("星期六");
			break;
		case 7:
			System.out.println("星期日");
			break;
		}
	}
	
	
	public static void paramTest(String str,int... nums) {
		System.out.println("第一个参数：" + str);
		System.out.println("nums的长度：" + nums.length);
		for (int i = 0; i < nums.length; i++) {
			System.out.println(nums[i]);
		}
	}
	
//END	
	
}
