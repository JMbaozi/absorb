import java.util.Arrays;
import java.util.Scanner;

/**
 * ����ƪ
 * @author JMbaozi
 *
 */
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("��ã����磡");
		
//		����뾶����Բ���
//		Scanner input = new Scanner(System.in);
//		System.out.printf("������뾶r��");
//		double radius = input.nextDouble();
//		double area = 3.14 * radius * radius;
//		System.out.printf("Բ�����Ϊ��%.2f\n",area);
//		input.close();
		
//		num++ �� ++num������
//		int num1 = 3,num2 = 4;
//		int result1 = num1++;	//�����ȸ�ֵ�ټ�һ
//		System.out.printf("%d\n%d\n",result1,num1);
//		int result2 = ++num2;	//ǰ���ȼ�һ�ٸ�ֵ
//		System.out.printf("%d\n%d\n",result2,num2);
		
//		if�ж�
//		Scanner input = new Scanner(System.in);
//		System.out.print("������Ӳ���̷���");
//		char ch = input.next().charAt(0);
//		if(ch >= 'A' && ch <= 'Z')
//			System.out.println("�Ϸ��̷����ƣ�");
//		else
//			System.err.println("�Ƿ��̷����ƣ�");
		
//		if�жϡ�*= += -= \= ��Ӧ��(��Ʒ����)
//		double LV = 35000.0;
//		double HM = 11044.5;
//		double CN = 1525.0;
//		double Total = LV + HM + CN*5;
//		if(Total>50000) {
//			Total *= 0.7;
//		}else {
//			Total *= 0.9;
//		}
//		System.out.printf("�ܼ�Ϊ��%.2f",Total);
		
//		switch-case��while���÷�
//		Scanner input = new Scanner(System.in);
//		int choice = -1;
//		System.out.println("1.��¼��Ϸ");
//		System.out.println("2.�˳���Ϸ");
//		System.out.print("����ѡ�");
//		choice = input.nextInt();
//		if(choice == 1) {
//			while(choice != 0){
//				System.out.println("1.��������");
//				System.out.println("2.��Ŀ����");
//				System.out.println("3.�������");
//				System.out.println("4.��������");
//				System.out.println("5.�۲����");
//				System.out.println("6.����һ��");
//				System.out.println("0.�˳�");
//				System.out.println("������ѡ��");
//				choice = input.nextInt();
//				switch(choice) {
//				case 0:
//					break;
//				case 1:
//					System.out.println("1.��������");
//					continue;
//				case 2:
//					System.out.println("2.��Ŀ����");
//					continue;
//				case 3:
//					System.out.println("3.�������");
//					continue;
//				case 4:
//					System.out.println("4.��������");
//					continue;
//				case 5:
//					System.out.println("5.�۲����");
//					continue;
//				case 6:
//					System.out.println("������ѡ��");
//					continue;
//				default:
//					System.out.println("�������");
//					System.exit(0);
//				}
//			}
//		}else if(choice == 2) {
//			System.exit(0);	//�����˳�
//		}else {
//			System.out.println("������󣬳����Զ��˳���");
//		}
		
//		forѭ�������� 100!��ֵ
//		int result = 0;
//		for(double i=0;i<=100;i++) {
//			result += i;
//		}	//���������i������
//		System.out.printf("100!��ֵ��%d",result);
		
//		1997��7����������ۻع飩
//		System.out.println("����һ\t���ڶ�\t������\t������\t������\t������\t������\t");
//		int date = 2;	//	������
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
		
//		����ʵ��:�������Сֵ������sort()
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
		
//		��ѯɾ���Ͳ�������Ԫ��
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
//		System.out.println("�������ѯ�����֣�");
//		Scanner input_search = new Scanner(System.in);
//		Num = input_search.nextInt();
//		for (int i = 0; i < nums_search.length; i++) {
//			if(nums_search[i] == Num) {
//				numIndex = i;
//				break;
//			}
//		}
//		System.out.println("��ѯ���ֵ��±꣺" + (numIndex + 1));
//		
//		System.out.println("�������������ֺ��±꣺");
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
		//ɾ��ͬ������׸����
		
		
//����Method
//		System.out.println("������������ڼ�(����)��");
//		int dayOfWeek = new Scanner(System.in).nextInt();
//		ShowWeekDayByEnglish(dayOfWeek);
//		ShowWeekDayByChinese(dayOfWeek);
		paramTest("��������", 1,2,3,4,5);
	}
	static void ShowWeekDayByEnglish(int dayOfWeek) {
		String[] weekdays = {"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"};
		System.out.println(weekdays[dayOfWeek-1]);
	}
	public static void ShowWeekDayByChinese(int dayOfWeek) {
		switch(dayOfWeek) {
		case 1:
			System.out.println("����һ");
			break;
		case 2:
			System.out.println("���ڶ�");
			break;
		case 3:
			System.out.println("������");
			break;
		case 4:
			System.out.println("������");
			break;
		case 5:
			System.out.println("������");
			break;
		case 6:
			System.out.println("������");
			break;
		case 7:
			System.out.println("������");
			break;
		}
	}
	
	
	public static void paramTest(String str,int... nums) {
		System.out.println("��һ��������" + str);
		System.out.println("nums�ĳ��ȣ�" + nums.length);
		for (int i = 0; i < nums.length; i++) {
			System.out.println(nums[i]);
		}
	}
	
//END	
	
}
