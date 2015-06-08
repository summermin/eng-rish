class UsersController < ApplicationController

  def index
  end

  def show
  end

  def get_tweets
    exclude = ["i", "i'm", "me", "my", 
            "you", "your", "you're",
            "he", "she", "him", "her", "his", "hers",
            "we", "we're", "us", "our", "them", "they", "their", "they're", "it", "it's",
            "who", "whose", "whom",
            "a", "an", "the",
            "am", "is", "are", "was", "were", "be", "being", "been", "has", "have",
            "do", "don't", "will", "won't", "would", "could", "get", "got",
            "as", "at", "by", "for", "of", "in", "on", "to", "with", "from", "about", 
            "up", "out", "so", "when", "go", "into",
            "and", "but", "or", "yet", "nor",
            "this", "that", "which", "there", "what", "if",
            "just", "not", "than", "then"
            "be", "too", "after", 
            "all", "also", "any", "as", "back", "because", 
            "can", "come", "day", "do", "even", "first", 
            "give", "good", "how", "into", "know", "like", 
            "look", "make", "most", "new", "no", "now", "one", 
            "only", "other", "over", "person", "say", "see", 
            "some", "take", "these", "think", "time", "two", 
            "use", "want", "way", "well", "what", "with", "work", 
            "would", "year" "are", "call", "did", "do", 
            "down", "each", "find", "had", "how", "long", 
            "made", "many", "may", "more", "number", "part", 
            "people", "said", "than", "the", "word", "you", "your",
          ]

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["consumer_key"]
      config.consumer_secret     = ENV["consumer_secret"]
      config.access_token        = ENV["access_token"]
      config.access_token_secret = ENV["access_token_secret"]
    end

    tweets = client.user_timeline("#{params[:user_id]}",{count: 200})

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

    word_list = []
    count.each do |k,v|
      if !exclude.include?(k)
        word_list << {:word => k, :freq => v, :length => k.length}
      end
    end

    avg_length = word_list.collect {|word| word[:length]}.inject(:+).to_f / word_list.size

    respond_to do |format|
      format.html {render action: "show"}
      format.json {render json: word_list}
    end

  end

end