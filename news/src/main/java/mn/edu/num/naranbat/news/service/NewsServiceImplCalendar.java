package mn.edu.num.naranbat.news.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NewsServiceImplCalendar implements NewsService {
    private static final String[] dates = {"Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"};

    @Override
    public String getPublishedDate(LocalDateTime value) {
        int year = value.getYear();
        int month = value.getMonthValue();
        int day = value.getDayOfMonth();
        int date = value.getDayOfWeek().getValue();
        int hour = value.getHour();
        int min = value.getMinute();
        return dates[date] + ", " + month + "-р сар " + day + ", " + year + " " + hour + ":" + min;
    }
}
