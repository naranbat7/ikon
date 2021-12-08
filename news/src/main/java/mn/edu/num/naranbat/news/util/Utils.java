package mn.edu.num.naranbat.news.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

    public static Long generateUniqueLong() {
        Date dNow = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("yyMMddhhmmssMs");
        String datetime = ft.format(dNow);
        return Long.parseLong(datetime);
    }

}
