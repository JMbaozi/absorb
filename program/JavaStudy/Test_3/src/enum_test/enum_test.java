package enum_test;
/**
 * 请编写程序。首先在程序中定义一个枚举类型，它含有7个枚举常量，分别表示一个星期每一天的名称。然后在控制台窗口中输出这些名称。
 * @author JMbaozi
 *
 */
public class enum_test {
	public enum WeekName{
		周一,周二,周三,周四,周五,周六,周日
	}
	public static void main(String[] args) {
		// TODO 自动生成的方法存根
		WeekName[] N = WeekName.values();
		for(int i=0;i<N.length;i++){
			System.out.println(N[i]);
		}

	}

}
