package random_use;
/**
 * ����random()��������(int)(Math.random()*20+0.5)10000�Σ�ͳ��0-20�ĸ����ֱ��Ƕ��ٲ����
 * @author JMbaozi
 *
 */
public class random_10000 {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] Matchlist = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};
		int[] result = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
		for(int i=0;i<10000;i++) {
			int num = (int)(Math.random()*20+0.5);
			for(int j=0;j<Matchlist.length;j++) {
				if(num==Matchlist[j]) {
					result[j]+=1;
				}
			}
		}
		for(int i=0;i<result.length;i++) {
			System.out.println(result[i]);
		}
	}
}
