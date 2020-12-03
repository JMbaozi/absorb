package ClassLearn;
/**
 * Role类的使用
 * @author JMbaozi
 *
 */
public class RoleTest {
	public static void main(String[] args) {
		
//		重载前
//		Role role1 = new Role();
//		Role role2;
//		role2 = new Role();
//		Role role3 = new Role();
//		
//		role1.name = "劳拉";
//		role1.level = 66;
//		role1.job = "盗墓";
//		role1.castSpell();
//		
//		role2.name = "孙悟空";
//		role2.level = 666;
//		role2.job = "旅游";
//		role2.castSpell();
//		
//		role3.name = "至尊宝";
//		role3.castSpell();
		
//		重载后	初始化时必须有赋予参数
		Role role1 = new Role("侯亮平",66,"检察官");
		role1.castSpell();
		//默认构造显式创建
		Role role2 = new Role();
		
	}
}
