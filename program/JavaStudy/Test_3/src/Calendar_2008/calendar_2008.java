package Calendar_2008;
/**
 * ���2008��������Ҫ�����·ݡ����������ڡ�ͳ�Ʋ����2008�����ڵĸ�λ�����Ӧ������ǡ����ͬ��������
 * @author JMbaozi
 *
 */
public class calendar_2008 {
	public static void main(String[] args) {
		int[] date_data = {2,5,6,2,4,7,2,5,1,3,6,1};
		int[] space_data = {1,4,5,1,3,6,1,4,0,2,5,0};
		int[] days_data = {31,29,31,30,31,30,31,31,30,31,30,31};
		String s = "";
		for(int i =0;i<12;i++) {
			System.out.printf("\t\t%d��\n",i+1);
			s += ShowCalendar(date_data[i],space_data[i],days_data[i],i+1);
		}
		System.out.println(s);
	}
	public static String ShowCalendar(int date,int space,int days,int month) {
		//date:��ʼ������;space:��ͷ�հ�����;days:һ���µ�����;month:�·�
		System.out.println("����һ\t���ڶ�\t������\t������\t������\t������\t������\t");
		String str = "";//��¼���ڵĸ�λ�����Ӧ������ǡ����ͬ
		for(int i=1;i<=days+space;i++) {
			if(i <= space) {
				System.out.printf("\t");
			}else if(i == space+1){
				System.out.printf("%d\t",1);
				if(date<7) {
					date += 1;
				}else {
					System.out.println('\n');
					date = 1;
				}
			}else if(date < 7) {
				System.out.printf("%d\t",i-space);
				if(date == i-space) {
					str += Integer.toString(month);str += "��";
					str += Integer.toString(i);str += "��\n";
				}else if(((i-space)%10) == date) {
					str += Integer.toString(month);str += "��";
					str += Integer.toString(i);str += "��\n";
				}else {
					str += "";
				}
				date += 1;
			}else if(date == 7){
				System.out.printf("%d\n",i-space);
				if(date == i-space) {
					str += Integer.toString(month);str += "��";
					str += Integer.toString(i);str += "��\n";
				}else if(((i-space)%10) == date) {
					str += Integer.toString(month);str += "��";
					str += Integer.toString(i);str += "��\n";
				}else {
					str += "";
				}
				date = 1;
			}
		}
		System.out.println('\n');
		return str;
	}
}
