################################################## CHAPTERS - 9, 10, 11 ############################################################
data<-read.csv("C:/users/seren/OneDrive/Desktop/2ndYear/R/R project/catalog.csv")

library(ggplot2)
library(dplyr)
library(grid)
library(gridExtra)
library(tidyr)
library(glue)
library(scales)

# Data Preparation
data$year<-sapply(data$date,function(x) as.numeric(strsplit(x,'/')[[1]][3])) + 2000
data$month<-sapply(data$date,function(x) as.numeric(strsplit(x,'/')[[1]][1]))

myMonths <- c("January","February","March","April","May","June","July","August","September","October","November","December")
data$MonthAbb <- myMonths[ data$month ]
data$month_ordered <- factor(data$MonthAbb, levels = month.name)

data$landslide_type <- tolower(data$landslide_type)
data$landslide_size <- tolower(data$landslide_size)
data$trigger <- tolower(data$trigger)

data<-data[!is.na(data$year),]
data<-data[!(data$landslide_type == ""),]
data<-data[!(data$landslide_size == ""),]
data<-data[!(data$trigger == ""),]

dataUSA = subset(data, data$country_name == "United States")
dataUSA<-dataUSA[!is.na(dataUSA$fatalities),]
dataUSA<-dataUSA[!is.na(dataUSA$injuries),]
dataUSA<-dataUSA[order(dataUSA$year),]

# Using basic r plots

# Landslide size Occurrences
size = length(levels(as.factor(data$landslide_size)))
pie(table(data$landslide_size), labels = levels(as.factor(data$landslide_size)), main = "Landslide Size Occurrences", col = terrain.colors(size), cex = 0.8)

# Occurrence of different types of Triggers of landslides
barplot(table(data$trigger), col = brewer.pal(5,"Set2"), xlab = "Frequency", main = "Occurrences of different types of triggers", horiz = T, las = 2, cex.names = 0.5)

# Fatalities and Injuries vs Distance traveled by landslide
par(mai = rep(1, 4)) 
plot(y = data$fatalities, x = data$distance, type = "p", xlab = "distance", ylab = "fatalities", main = "Fatalities vs Distance traveled by landslide")
plot(y = data$injuries, x = data$distance, type = "p", xlab = "distance", ylab = "injuries", main = "Injuries vs Distance traveled by landslide")

# Fatalities in US over the years
sum = aggregate(x = dataUSA$fatalities, by = list(dataUSA$year), FUN = sum)
plot(x = sum$Group.1, y = sum$x, type = "l", xlab = "year", ylab = "total fatalities", col="red", main="Fatalities in USA over the years")

# Using ggplot

# Distribution of landslide per type and country
data %>% 
  group_by(country_name, landslide_type) %>% 
  summarize(count = n()) %>% 
  ggplot(aes(x = reorder(country_name, count), y = count, fill = landslide_type)) +
  xlab('Country') + ylab('Frequency') +
  ggtitle("Distribution of landslide per type and country")+
  coord_flip() +
  geom_bar(stat = 'identity')

# Distribution of landslide per trigger per year
data %>% 
  group_by(year, trigger) %>% 
  summarize(count = n()) %>%
  ggplot() +
  ggtitle("Distribution of landslide per trigger per year")+
  geom_line(aes(x = year, y = count, color = trigger), size = 2)

# Distribution of landslide per type
data%>%
  group_by(landslide_type) %>%
  summarize(count = n()) %>%
  ggplot(aes(x='', y=count, fill=landslide_type))+
  ggtitle("Distribution of landslide type")+
  geom_bar(stat = "identity")+
  theme_void()+
  coord_polar("y")+
  geom_text((aes(label=percent(count/sum(count),accuracy = 0.01))), position = position_stack(vjust = 0.5), size=3)

# To check if there is a seasonality of occurrence of landslides
data %>% 
  group_by(year, month_ordered) %>% 
  summarize(count = n()) %>% 
  ggplot(aes(x = year, y = month_ordered)) +
  ggtitle("Seasonality of occurence of landslides") +
  geom_tile(aes(fill = count), colour = "white")

data %>% select(month_ordered, year) %>% 
  group_by(month_ordered, year) %>% 
  summarize(count = n()) %>% 
  ggplot(aes(x = month_ordered, y = count)) +
  xlab('Month') + ylab('Frequency') +
  ggtitle("Seasonality of occurence of landslides") +
  geom_boxplot(colour = 'black') + 
  geom_smooth(method = 'lm', formula = y ~ poly(x, 2), color = 'blue', lty = 2, aes(group = 1))

# To analyze the region of occurrences of various types of landslides and the number of fatalities they cause
worldMap <- fortify(map_data("world"), region = "region")
map <- ggplot() + 
  geom_map(data = worldMap, map = worldMap, aes(x = long, y = lat, map_id = region)) +
  ggtitle("Frequency of occurrence of fatalities due to different landslide types on World Map") +
  xlim(-160,-30) + ylim(-60,60)
map + geom_point(data = data, aes(x = longitude, y = latitude, color = landslide_type, size = fatalities))

# Analysis of landslides in USA
mean(dataUSA$fatalities)
median(dataUSA$fatalities)
sd(dataUSA$fatalities)
hist(dataUSA$fatalities, col = "darkgreen")

mean(dataUSA$injuries)
median(dataUSA$injuries)
sd(dataUSA$injuries)
hist(dataUSA$injuries, col = "darkgreen")

mean(dataUSA$distance)
median(dataUSA$distance)
sd(dataUSA$distance)
boxplot(dataUSA$distance, col="lightgreen")

mean(dataUSA$population)
median(dataUSA$population)
sd(dataUSA$population)
hist(dataUSA$population, col="lightgreen")

levels(factor(dataUSA$year))
levels(factor(dataUSA$landslide_type))
levels(factor(dataUSA$landslide_size))
levels(factor(dataUSA$trigger))

# Analysis of landslides in 2015
data2015 = subset(data, data$year == "2015")
data2015<-data2015[!is.na(data2015$fatalities),]
data2015<-data2015[!is.na(data2015$injuries),]
cols <- c("distance", "fatalities", "injuries");
summary(data2015[cols])

levels(factor(data2015$landslide_type))
levels(factor(data2015$landslide_size))
levels(factor(data2015$trigger))

##################################################################################################################################