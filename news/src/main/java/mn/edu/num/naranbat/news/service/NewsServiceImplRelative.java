package mn.edu.num.naranbat.news.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NewsServiceImplRelative implements NewsService {
    @Override
    public String getPublishedDate(LocalDateTime value) {
        var now = LocalDateTime.now();
        int year = value.getYear();
        int year2 = now.getYear();
        int month = value.getMonthValue();
        int month2 = now.getMonthValue();
        int day = value.getDayOfMonth();
        int day2 = now.getDayOfMonth();
        int hour = value.getHour();
        int hour2 = now.getHour();
        int min = value.getMinute();
        int min2 = now.getMinute();
        if (year2 > year) return (year2 - year) + " жилийн өмнө";
        if (month2 > month) return (month2 - month) + " сарын өмнө";
        if (day2 > day) return (day2 - day) + " өдрийн өмнө";
        if (hour2 > hour) return (hour2 - hour) + " цагийн өмнө";
        if (min2 > min) return (min2 - min) + " минутын өмнө";
        return "Хэдхэн хоромын өмнө";
    }
}
