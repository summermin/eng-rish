class UsersController < ApplicationController

  def index
  end

  def show
    exclude = ["i", "i'm", "me", "my", 
            "you", "your", "you're", 
            "we", "we're", "us", "them", "they", "their", "they're", "it", "it's",
            "a", "an", "the",
            "am", "is", "are", "was", "were", "be", "being", "been", "has", "have",
            "do", "don't",
            "as", "at", "by", "for", "of", "in", "on", "to",
            "and", "but", "or", "yet", "nor", "so"] 

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["consumer_key"]
      config.consumer_secret     = ENV["consumer_secret"]
      config.access_token        = ENV["access_token"]
      config.access_token_secret = ENV["access_token_secret"]
    end
    
    tweets = client.user_timeline("#{params[:id]}",{count: 200})

    # all_tweets = tweets.map { |tweet| tweet.text }
    all_tweets = tweets.map(&:text).join(" ").downcase
    all_tweets.gsub!(/\brt|[.,?!():;]/,"")

    words = all_tweets.split(" ")

    words = words.select do |word|
              word.strip.match(/^[a-z']+$/)  
            end

    count = Hash.new(0)

    words.each do |word|
      count[word] += 1
    end

    count = Hash[count.sort_by{|k, v| v}.reverse]

    count_new = {}
    count.each do |word,count|
      if !exclude.include?(word)  
        count_new[word] = count
      end
    end

    word_lengths = count_new.keys.collect do |word|
                      word.length
                    end  

    avg_length = word_lengths.inject(:+).to_f / word_lengths.size
    binding.pry

  end

end