package Calendar_2008;
/**
 * 输出2008年日历，要求有月份、日期与星期。统计并输出2008年日期的个位数与对应的星期恰好相同的总天数
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
			System.out.printf("\t\t%d月\n",i+1);
			s += ShowCalendar(date_data[i],space_data[i],days_data[i],i+1);
		}
		System.out.println(s);
	}
	public static String ShowCalendar(int date,int space,int days,int month) {
		//date:初始星期数;space:开头空白天数;days:一个月的天数;month:月份
		System.out.println("星期一\t星期二\t星期三\t星期四\t星期五\t星期六\t星期日\t");
		String str = "";//记录日期的个位数与对应的星期恰好相同
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
					str += Integer.toString(month);str += "月";
					str += Integer.toString(i);str += "日\n";
				}else if(((i-space)%10) == date) {
					str += Integer.toString(month);str += "月";
					str += Integer.toString(i);str += "日\n";
				}else {
					str += "";
				}
				date += 1;
			}else if(date == 7){
				System.out.printf("%d\n",i-space);
				if(date == i-space) {
					str += Integer.toString(month);str += "月";
					str += Integer.toString(i);str += "日\n";
				}else if(((i-space)%10) == date) {
					str += Integer.toString(month);str += "月";
					str += Integer.toString(i);str += "日\n";
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
